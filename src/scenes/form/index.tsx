import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type UserSubmitForm = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  access: string;
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  contact: Yup.string()
    .matches(phoneRegExp, "Contact number is not valid")
    .required("Contact is required"),
  address: Yup.string().required("Address 1 is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  dateOfbirth: new Date(),
  access: "",
};

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs("2023-01-01"));

  const handleFormSubmit = async (data: UserSubmitForm) => {
    const id = await requestLastIdFromContats();
    const currentDate = dayjs();
    const age = currentDate.diff(dateValue, "year");
    const finalUserObject = {
      id: id + 1,
      name: data.firstName + " " + data.lastName,
      age: age,
      email: data.email,
      phone: data.contact,
      access: data.access,
    };
    confirmTeamData(finalUserObject);
  };

  const requestLastIdFromContats = async () => {
    let jsonLength = 0;
    return fetch(
      "https://admin-2f19b-default-rtdb.firebaseio.com/admin/team.json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (const item in responseJson) {
          jsonLength++;
        }
        return jsonLength;
      });
  };

  const confirmTeamData = async (teamData: any) => {
    try {
      const response = await fetch(
        "https://admin-2f19b-default-rtdb.firebaseio.com/admin/team.json",
        {
          method: "POST",
          body: JSON.stringify(teamData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CREATE USER" description="Create a New User Profile" />
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <TextField
                fullWidth
                type="text"
                id="first_name"
                label="First Name"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                type="text"
                id="last_name"
                name="lastName"
                label="Last Name"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                type="email"
                id="email"
                name="email"
                label="Email"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2", mt: "10px" }}
              />

              <TextField
                fullWidth
                type="text"
                id="contact"
                name="contact"
                label="Contact Number"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                type="text"
                id="address"
                name="address"
                label="Address"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ gridColumn: "span 2" }}
                >
                  <DatePicker
                    label="Date of Birth"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    slotProps={{
                      textField: {
                        helperText: "MM / DD / YYYY",
                      },
                    }}
                    sx={{ gridColumn: "span 2" }}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl>
                <InputLabel id="select-label">Access</InputLabel>
                <Select
                  labelId="select-label"
                  id="access"
                  name="access"
                  value={values.access}
                  label="Age"
                  onChange={handleChange}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiSelect-select, .MuiSelect-select:hover, .MuiSelect:active, .MuiSelect.MenuItem":
                      {
                        backgroundColor: colors.primary[500],
                        border: colors.grey[100],
                      },
                  }}
                >
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="manager">manager</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="outlined">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
