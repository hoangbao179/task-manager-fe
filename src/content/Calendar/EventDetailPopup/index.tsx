import { Grid, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FC } from "react";
import { ItemDetailWrapper, LabelDescriptionDetail, LabelDetail } from "./event-detail-popup.styles";
import { CalendarEvent } from "../../../models/Calendar/calendar-event";
import { E_FormatDate } from "../../../enums/E_FormatDate";
import parse from 'html-react-parser';
import dayjs from "dayjs";
interface IEventDetailPopupComponentProps {
  eventDetail: CalendarEvent;
}

const EventDetailPopupComponent: FC<IEventDetailPopupComponentProps> = ({ eventDetail }): JSX.Element => {
  const getTimeText = (): JSX.Element => {
    const startDateString = dayjs(eventDetail?.startDate).format(E_FormatDate.DateEvent);
    const endDateString = dayjs(eventDetail?.endDate).format(E_FormatDate.DateEvent);
    if (eventDetail?.startDate === eventDetail?.endDate) {
      if (eventDetail?.isAllDay) {
        return <>{startDateString}</>;
      }
      return (
        <>
          {startDateString} {eventDetail?.startTimeString}{" "}
          {eventDetail?.endDateTimeString ? "to" : ""} {eventDetail?.endDateTimeString}
        </>
      );
    } else {
      if (eventDetail?.isAllDay) {
        return (
          <>
            {startDateString} to {endDateString}
          </>
        );
      }
      return (
        <>
          {startDateString} {eventDetail?.startTimeString}{" "}
          {eventDetail?.endDateTimeString ? "to" : ""} {endDateString} {eventDetail?.endDateTimeString}
        </>
      );
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{eventDetail && eventDetail.title}</Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        <LabelDetail>
          <AccessTimeOutlinedIcon />
        </LabelDetail>
        <ItemDetailWrapper>{getTimeText()}</ItemDetailWrapper>
      </Grid>
      {eventDetail?.description && (
        <Grid item xs={12} container alignItems="center">
          <LabelDescriptionDetail>
            <InfoOutlinedIcon />
          </LabelDescriptionDetail>
          <ItemDetailWrapper isRichText={true}>{parse(eventDetail?.description || '')}</ItemDetailWrapper>
        </Grid>
      )}
    </Grid>
  );
};

export default EventDetailPopupComponent;
