import React, { ReactNode, useState } from 'react';
import { ButtonGroup, Tab, TabsStyled } from './Tabs.styles';
const tabs = [{ key: 'tab1', title: 'tab 1', children: <>tab 1</> }];

export type TabType = {
  key: string;
  title: ReactNode;
  children?: ReactNode;
};
type TabsProps = {
  defaultSelectedTab?: string;
  tabs: TabType[];
};

const Tabs = ({ tabs, defaultSelectedTab }: TabsProps) => {
  const [active, setActive] = useState(defaultSelectedTab ?? tabs[0].key);
  const activeChildren = tabs.find((tab) => tab.key === active)?.children;
  return (
    <TabsStyled>
      <ButtonGroup>
        {tabs.map(({ title, key }) => (
          <Tab key={key} active={active === key} onClick={() => setActive(key)} type="button">
            {title}
          </Tab>
        ))}
      </ButtonGroup>

      {activeChildren}
    </TabsStyled>
  );
};

export default Tabs;
