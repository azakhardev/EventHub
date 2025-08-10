import { Search } from "lucide-react";
import { useFilterStore, type Filter } from "../../store/store";
import Checkbox from "./forms/Checkbox";
import Input from "./forms/Input";
import { Field, Label, Select } from "@headlessui/react";
import Button from "./forms/Button";

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilter: () => void;
}

export default function Filter(props: FilterProps) {
  const { filter, setFilter } = useFilterStore();

  return (
    <div className="w-full flex flex-row justify-between mt-1">
      <div className="flex flex-row flex-1 gap-4">
        <Input
          className="w-2/5"
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
          onCheck={(checked) =>
            setFilter((old) => ({ ...old, owned: checked }))
          }
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
      <div className="flex flex-row gap-4">
        <Field className="flex flex-row items-center gap-2">
          <Label>Order:</Label>
          <Select
            onChange={(e) => {
              setFilter((old) => ({
                ...old,
                order: e.target.value as "asc" | "desc",
              }));
            }}
            value={filter.order}
            className="flex-1 w-auto p-2 rounded-md cursor-pointer border"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Field>
        <Field className="flex flex-row items-center gap-2">
          <Label>From:</Label>
          <input
            type="date"
            className="p-1 rounded-md border"
            onChange={(e) =>
              setFilter((old) => ({
                ...old,
                startDate: e.target.valueAsDate!.toISOString(),
              }))
            }
          />
        </Field>

        <Field className="flex flex-row items-center gap-2">
          <Label>To:</Label>
          <input
            type="date"
            className="p-1 rounded-md border"
            onChange={(e) =>
              setFilter((old) => ({
                ...old,
                endDate: e.target.valueAsDate!.toISOString(),
              }))
            }
          />
        </Field>

        <Button onClick={() => props.onFilter()}>Filter</Button>
      </div>
    </div>
  );
}
