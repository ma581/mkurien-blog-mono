#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { MkurienBlogMonoStack } from '../lib/mkurien-blog-mono-stack';

const app = new cdk.App();
new MkurienBlogMonoStack(app, 'MkurienBlogMonoStack');
