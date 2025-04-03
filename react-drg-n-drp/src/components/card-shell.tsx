import React from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import type { ICard as CardType } from '@/lib/types';

const CardShell: React.FC<CardType> = ({ content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> {content} </CardTitle>
      </CardHeader>
    </Card>
  );
};

export { CardShell };
