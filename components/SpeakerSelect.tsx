import React, { Dispatch, SetStateAction } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SpeakerSelect = ({
  setSpeaker,
}: {
  setSpeaker: Dispatch<SetStateAction<string>>;
}) => (
  <Select.Root onValueChange={(value) => setSpeaker(value)}>
    <Select.Trigger className="SelectTrigger" aria-label="Speaker">
      <Select.Value placeholder="Select a speaker..." />
      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>

        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel">Session I</Select.Label>
            <SelectItem value="Pratika Katiyar">Pratika Katiyar</SelectItem>
            <SelectItem value="Debpriya Das">Debpriya Das</SelectItem>
            <SelectItem value="Catherine Murphy">Catherine Murphy</SelectItem>
          </Select.Group>

          <Select.Separator className="SelectSeparator" />

          <Select.Group>
            <Select.Label className="SelectLabel">Session II</Select.Label>
            <SelectItem value="Andre Neto Caetano">
              Andre Neto Caetano
            </SelectItem>
            <SelectItem value="Alexander Qiu">Alexander Qiu</SelectItem>
            <SelectItem value="Khushi Gandhi">Khushi Gandhi</SelectItem>
            <SelectItem value="Ren Birnholz">Ren Birnholz</SelectItem>
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = React.forwardRef<HTMLElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={["SelectItem", className].join(" ")}
        {...props}
        ref={forwardedRef as React.ForwardedRef<HTMLDivElement>}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SpeakerSelect;
