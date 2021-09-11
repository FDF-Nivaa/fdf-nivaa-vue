<template>
  <span class="date-span">
    <time :datetime="microDataStartDate" itemprop="startDate">{{
      formattedDates.start
    }}</time>
    <template v-if="formattedDates.end">
      -
      <time :datetime="microDataEndDate" itemprop="endDate">{{
        formattedDates.end
      }}</time>
    </template>
  </span>
</template>

<script>
import format from "date-fns/format";
import { formatDateSpanAsObject } from "../utils/format";

export default {
  name: "DateSpan",
  props: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    includeTime: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { microDataDateFormat: "Y-MM-dd'T'HH:ii:ss" };
  },
  computed: {
    formattedDates() {
      return formatDateSpanAsObject(
        this.startDate,
        this.endDate,
        this.includeTime
      );
    },
    microDataStartDate() {
      return format(this.startDate, this.microDataDateFormat);
    },
    microDataEndDate() {
      return format(this.endDate, this.microDataDateFormat);
    },
  },
};
</script>
