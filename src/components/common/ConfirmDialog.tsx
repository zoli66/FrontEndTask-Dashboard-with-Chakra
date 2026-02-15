import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
};
function ConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "حذف آیتم",
  description = "آیا از حذف این آیتم مطمئن هستید؟",
  isLoading = false,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content dir="rtl">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Text>{description}</Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Flex gap={3}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">لغو</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette="red"
                  onClick={onConfirm}
                  loading={isLoading}
                >
                  حذف
                </Button>
              </Flex>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ConfirmDialog;
