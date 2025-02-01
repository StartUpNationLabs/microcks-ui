import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";
import {IngestionType, IngestionTypeSlice} from "@/store/slices/createIngestionTypeSlice.tsx";

export default function PlanCard({ item, onClick }: {
    item: IngestionType;
    onClick: () => void;
}) {
  const { isToggled, ingestionType } = useStore((state) => state);
  return (
    <Card
      className={cn(
        "w-full cursor-pointer hover:border-accent-foreground",
        {
          "border-accent-foreground": ingestionType && ingestionType?.type === item.type,
        }
      )}
      onClick={onClick}
    >
      <CardContent className="w-full lg:pt-5 flex items-center h-full gap-[14px] p-4 lg:flex-col lg:items-start">
        <div className="relative w-10 h-10 lg:mb-[39px]">
          {item.image}
        </div>
        <div className="flex flex-col gap-[7px]">
          <CardTitle className="text-base font-medium text-accent-foreground">
            {item?.name}
          </CardTitle>
            <p className="text-xs text-neutral-cool-gray">{item?.description}</p>


        </div>
      </CardContent>
    </Card>
  );
}
