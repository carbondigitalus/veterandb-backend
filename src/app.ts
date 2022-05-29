// Core Modules

// NPM Modules
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// NPM Module Classes
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

// Custom Modules
