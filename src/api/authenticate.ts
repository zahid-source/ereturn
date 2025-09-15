import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import {BASE_URL_BACKEND} from '../app/service/constant';

const BASE_URL = BASE_URL_BACKEND;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(`${BASE_URL}/authenticationservice/v3/api/authenticate/taxpayer`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Authenticate proxy failed', details: err });
  }
}
