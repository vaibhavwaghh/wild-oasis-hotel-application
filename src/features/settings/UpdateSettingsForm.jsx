import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import useUpdateSetting from "./useUpdatesetting";

function UpdateSettingsForm() {
  const { isLoading, error, setting } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  if (setting) {
    var { minBookingLen, maxBookingLen, maxGuestsPerBooking, breakfastPrice } =
      setting;
  }
  function handleUpdate(e, field) {
    const value = e.target.value;
    if (!value) return;
    updateSetting({ [field]: value });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLen}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLen")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLen}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLen")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
