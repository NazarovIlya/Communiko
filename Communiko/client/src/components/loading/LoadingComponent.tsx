import React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

interface PropsLoadingComponent {
  inverted?: boolean;
  text?: string;
}

export default function LoadingComponent({ text }: PropsLoadingComponent) {
  return (
    <Dimmer active={true} inverted={false}>
      <Loader content={text} />
    </Dimmer>
  )
}