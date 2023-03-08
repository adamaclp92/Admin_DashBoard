import React, { ChangeEvent } from "react";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  color: "black",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [newCalendarItemValue, setNewCalendarItemValue] = useState("");

  const handleDateClick = (selected: any) => {
    handleOpen();
    setSelectedEvent(selected);
  };

  const handleSubmitModal = () => {
    const calendarApi = selectedEvent.view.calendar;
    calendarApi.unselect();

    if (newCalendarItemValue !== "") {
      calendarApi.addEvent({
        id: `${selectedEvent.dateStr} - ${newCalendarItemValue}`,
        title: newCalendarItemValue,
        start: selectedEvent.startStr,
        end: selectedEvent.endStr,
        allDay: selectedEvent.allDay,
      });
      setNewCalendarItemValue("");
    }

    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEventClick = (selected: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <React.Fragment>
      <Box m="20px">
        <Header title="CALENDAR" description="Full Calendar Interactive Page" />

        <Box display="flex" justifyContent="center">
          {/* CALENDAR SIDEBAR*/}
          <Box
            flex="1 1 20%"
            maxWidth="300px"
            p="15px"
            mr="10px"
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "4px",
            }}
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event: any) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/*CALENDAR */}
          <Box flex="1 1 100%" maxWidth="1010px" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev next today",
                center: "title",
                right: "dayGridMonth timeGridWeek timeGridDay listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events: any) => setCurrentEvents(events)}
              initialEvents={[
                { id: "1234", title: "All-day event", date: "2023-03-01" },
                { id: "2234", title: "Timed event", date: "2023-03-02" },
              ]}
            />
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography id="parent-modal-title" variant="h4" fontWeight="bold">
            Please enter a new title for your event:
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Input
              autoFocus
              placeholder="Type here..."
              sx={{ color: "black" }}
              value={newCalendarItemValue}
              onChange={(e: any) => setNewCalendarItemValue(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSubmitModal}
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Calendar;
