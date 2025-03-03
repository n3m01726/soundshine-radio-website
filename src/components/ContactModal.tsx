
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#230e4e] text-white border border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contact Us</DialogTitle>
          <DialogDescription className="text-white/80">
            Get in touch with the SoundShine Radio team
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            We'd love to hear from you! Whether you have feedback, song requests, or 
            business inquiries, our team is ready to assist.
          </p>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Email</h3>
            <p>contact@soundshineradio.com</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Social Media</h3>
            <p>Follow us on social media for updates and behind-the-scenes content!</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Instagram</Button>
              <Button variant="outline" size="sm">Twitter</Button>
              <Button variant="outline" size="sm">Facebook</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
