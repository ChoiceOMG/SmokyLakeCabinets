import { Switch } from "@headlessui/react";

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
};

export default function ToggleSwitch({ checked, onChange }: SwitchProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? "bg-slate-300" : "bg-slate-700"}
    relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-5" : "translate-x-0"}
      pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
