import Input from "../../../components/ui/Input";

function TargetInput() {
  return (
    <Input
      label="Target IP Address"
      placeholder="192.168.1.1"
      helperText="Enter an IP or hostname"
    />
  );
}

export default TargetInput;
