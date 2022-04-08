/*
  Copyright 2020-2022 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React, { useState } from 'react';

import { ErrorBoundary } from '@lowdefy/block-utils';

import CategorySwitch from './CategorySwitch.js';
import MountEvents from '../MountEvents.js';

const Block = ({ block, Blocks, context, isRoot, lowdefy, parentLoading }) => {
  const [updates, setUpdate] = useState(0);
  lowdefy._internal.updaters[block.id] = () => setUpdate(updates + 1);
  return (
    <ErrorBoundary>
      <MountEvents
        context={context}
        parentLoading={parentLoading}
        triggerEvent={async () => {
          await block.triggerEvent({ name: 'onMount' });
        }}
        triggerEventAsync={() => {
          block.triggerEvent({ name: 'onMount' });
        }}
      >
        {(loading) => (
          <CategorySwitch
            block={block}
            Blocks={Blocks}
            context={context}
            isRoot={isRoot}
            loading={loading}
            lowdefy={lowdefy}
            updates={updates}
          />
        )}
      </MountEvents>
    </ErrorBoundary>
  );
};

export default Block;
