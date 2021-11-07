import http from 'http';

import { PORT } from './config';
import logger from './logger';

function getRawBody(req: http.IncomingMessage): Promise<string> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    req
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve(body);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function bodyToJson(rawBody: string): { body?: unknown; error?: unknown } {
  try {
    const body = JSON.parse(rawBody);
    return { body };
  } catch (error) {
    return { error };
  }
}

function getRequestId(req: http.IncomingMessage): string | undefined {
  const headerValue = req.headers['X-Request-Id'];
  return Array.isArray(headerValue) ? headerValue[0] : headerValue;
}

function log(req: http.IncomingMessage, controllerName: string) {
  const { url = '' } = req;
  const requestId = getRequestId(req);
  const params = url?.split('?').slice(1).join();
  logger.debug(
    `[${controllerName}]: Request ID: ${requestId}, URL: ${url}, Params: ${params}`
  );
}

// Request might be handled asyncronosly therefore 
// this handler is async.
async function defaultController(
  req: http.IncomingMessage
) {
  log(req, 'defaultController');
  return 'Default'
}

async function getUserController(
  req: http.IncomingMessage
) {
  log(req, 'getUserController');
  return 'GET /user'
}

async function postUserController(
  req: http.IncomingMessage
) {
  log(req, 'postUserController');
  const rawBody = await getRawBody(req);
  const { body, error } = bodyToJson(rawBody);

  if (error) {
    logger.error('[postUserController]: Error:', error);
  }

  logger.debug('[postUserController]: Body:', body);
  return 'POST /user'
}

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  let response = '';

  switch (true) {
    case url === '/user' && method === 'GET':
      response = await getUserController(req);
      break;
    case url === '/user' && method === 'POST':
      response = await postUserController(req);
      break;
    default:
      response = await defaultController(req);
  }
  res.end(response);
});

server.listen(PORT, () => {
  logger.info(`[SERVER]: Listening on port ${PORT}`);
});
