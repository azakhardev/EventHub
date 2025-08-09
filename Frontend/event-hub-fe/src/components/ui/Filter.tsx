import { Search } from "lucide-react";
import { useFilterStore, type Filter } from "../../store/store";
import Checkbox from "./forms/Checkbox";
import Input from "./forms/Input";

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilter?: () => void;
}

export default function Filter(props: FilterProps) {
  const { filter, setFilter } = useFilterStore();

  console.log(filter);

  return (
    <div className="w-full flex flex-row gap-4 mt-1">
      <Input
        className="w-1/3"
        icon={<Search />}
        placeholder="Search by name"
        onChange={(e) => {
          setFilter((old) => ({
            ...old,
            expression: e.target.value,
          }));
        }}
      />

      <Checkbox
        text="Owned"
        checked={filter.owned}
        onCheck={(checked) => setFilter((old) => ({ ...old, owned: checked }))}
      />

      <Checkbox
        text="Important"
        checked={filter.important}
        onCheck={(checked) =>
          setFilter((old) => ({ ...old, important: checked }))
        }
      />

      <Checkbox
        text="Private"
        checked={filter.private}
        onCheck={(checked) =>
          setFilter((old) => ({ ...old, private: checked }))
        }
      />
    </div>
  );
}
