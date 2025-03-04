import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import protect from '../../middlewares/auth.middleware';

describe('Middleware de protection', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.JWT_SECRET = 'test_secret';
  });

  it('doit retourner une erreur 401 si le token est manquant', () => {
    req.headers = {};
    protect(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Accès refusé. Token manquant" });
  });

  it('doit retourner une erreur 401 si le token est invalide', () => {
    req.headers = { authorization: 'Bearer token_invalide' };
    protect(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token invalide" });
  });

  it('doit appeler next() et ajouter req.user si le token est valide', () => {
    const payload = { id: 1, nom: 'Utilisateur test' };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    req.headers = { authorization: `Bearer ${token}` };

    protect(req as Request, res as Response, next);
    expect(req.user).toEqual(expect.objectContaining(payload));
    expect(next).toHaveBeenCalled();
  });
});
