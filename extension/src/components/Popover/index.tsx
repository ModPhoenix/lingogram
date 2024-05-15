import {
  Popover as AriaPopover,
  PopoverProps as AriaPopoverProps,
} from "react-aria-components";

interface PopoverProps extends Omit<AriaPopoverProps, "children"> {
  children: React.ReactNode;
}

export const Popover = ({ children, ...props }: PopoverProps) => {
  return (
    <AriaPopover shouldFlip isNonModal {...props}>
      {children}
    </AriaPopover>
  );
};
