import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div style={{ padding: 48, textAlign: 'center' }}>
    <h1>404 — Страница не найдена</h1>
    <p>Запрошенный ресурс не найден.</p>
    <p>
      <Link to="/">На главную</Link>
    </p>
  </div>
);
