import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update the meeting Details"
      open={open}
      onOpenChange={onOpenChange}>
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings`);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
