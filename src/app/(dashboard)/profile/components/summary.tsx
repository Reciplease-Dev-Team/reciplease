import { DailyChart } from "../dailyChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExtendedUser } from "../page";

interface SummaryProps {
  data: ExtendedUser;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  console.log(data);
  return (
    <section className="p-4 ">
      <h2 className="text-2xl font-bold mb-2">Summary</h2>

      <Tabs
        defaultValue="food"
        className="w-full">
        <TabsList className="w-full justify-between ">
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>
        <TabsContent value="food">
          <DailyChart
            title="Calories"
            description="From Today's Meals"
            unit="kcal consumed"
            info={1}
          />
        </TabsContent>
        <TabsContent value="exercise">
          <DailyChart
            title="Exercise"
            description="From Today's Exercise"
            unit="kcal burned"
            info={1}
          />
        </TabsContent>
        <TabsContent value="sleep">
          <DailyChart
            title="Sleep"
            description="From Today's Sleep"
            unit="hours slept"
            info={1}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Summary;
