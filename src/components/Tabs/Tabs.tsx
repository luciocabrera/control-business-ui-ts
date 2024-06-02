import { ReactNode, useState } from 'react';

import { ButtonGroup, Tab, TabsStyled } from './Tabs.styles';

export type TabType = {
  key: string;
  title: ReactNode;
  children?: ReactNode;
};
type TabsProps = {
  defaultSelectedTab?: string;
  tabs: TabType[];
};

// const Tab = () => {};

const Tabs = ({ defaultSelectedTab, tabs }: TabsProps) => {
  const [active, setActive] = useState(defaultSelectedTab ?? tabs[0].key);
  const activeChildren = tabs.find((tab) => tab.key === active)?.children;
  // const handleTabOnClick = useCallback((key: string) => setActive(key), []);
  return (
    <TabsStyled>
      <ButtonGroup>
        {tabs.map(({ key, title }) => (
          <Tab
            key={key}
            active={active === key}
            type='button'
            onClick={() => setActive(key)}
          >
            {title}
          </Tab>
        ))}
      </ButtonGroup>

      {activeChildren}
    </TabsStyled>
  );
};

export default Tabs;
