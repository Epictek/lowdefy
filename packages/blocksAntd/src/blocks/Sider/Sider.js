/*
  Copyright 2020 Lowdefy, Inc

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

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { blockDefaultProps } from '@lowdefy/block-tools';
import { get } from '@lowdefy/helpers';

const Sider = Layout.Sider;

const triggerSetOpen = async ({ state, setOpen, methods, rename }) => {
  if (!state) {
    await methods.callAction({ action: get(rename, 'actions.onClose', { default: 'onClose' }) });
  }
  if (state) {
    await methods.callAction({ action: get(rename, 'actions.onOpen', { default: 'onOpen' }) });
  }
  setOpen(state);
};

const SiderBlock = ({ blockId, properties, content, methods, rename }) => {
  const [openState, setOpen] = useState(!!properties.defaultCollapsed);
  useEffect(() => {
    methods.registerMethod(
      get(rename, 'methods.toggleOpen', { default: 'toggleOpen' }),
      async () => await triggerSetOpen({ state: !openState, setOpen, methods, rename })
    );
    methods.registerMethod(
      get(rename, 'methods.setOpen', { default: 'setOpen' }),
      async ({ open }) => await triggerSetOpen({ state: !!open, setOpen, methods, rename })
    );
  });
  return (
    <Sider
      id={blockId}
      className={`${methods.makeCssClass([
        { overflow: 'auto', backgroundColor: properties.color && `${properties.color} !important` },
        properties.style,
      ])} hide-on-print`}
      breakpoint={properties.breakpoint}
      collapsed={openState}
      collapsedWidth={properties.collapsedWidth}
      collapsible={properties.collapsible}
      reverseArrow={properties.reverseArrow}
      theme={properties.theme}
      width={properties.width}
      onBreakpoint={() => methods.callAction({ action: 'onBreakpoint' })}
    >
      {content.content && content.content()}
    </Sider>
  );
};

SiderBlock.defaultProps = blockDefaultProps;

export default SiderBlock;
