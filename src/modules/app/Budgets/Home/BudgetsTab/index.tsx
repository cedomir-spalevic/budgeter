import React, { useEffect, useState } from "react";
import { SceneMap, Route, TabBar, TabView } from "react-native-tab-view";
import { colors } from "styles";
import { useBudgets } from "context/Budgets";
import Tab from "./Tab";
import { Budget } from "services/external/api/models";

const routes: Route[] = [
   { key: "active", title: "Active" },
   { key: "completed", title: "Completed" }
]

const BudgetsTab: React.FC = () => {
   const budgets = useBudgets();
   const [index, setIndex] = useState<number>(0);
   const [active, setActive] = useState<Budget[]>([]);
   const [completed, setCompleted] = useState<Budget[]>([]);

   useEffect(() => {
      setActive([...budgets.budgets.filter(x => !x.completed)]);
      setCompleted([...budgets.budgets.filter(x => x.completed)]);
   }, [budgets.budgets]);

   return (
      <TabView
         navigationState={{ index, routes }}
         onIndexChange={setIndex}
         renderScene={SceneMap({
            active: () => <Tab items={active} type="Active" />,
            completed: () => <Tab items={completed} type="Completed" />
         })}
         renderTabBar={(props) => (
            <TabBar
               {...props}
               indicatorStyle={{ backgroundColor: colors.primary }}
               style={{ backgroundColor: colors.white }}
               activeColor={colors.primary}
               inactiveColor={colors.secondaryDarker}
            />
         )}
         swipeEnabled={false}
         lazy
      />
   )
}

export default BudgetsTab;