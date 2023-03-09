import React from 'react';
import {Field, FieldArray} from "formik";
import Grid from "@mui/material/Grid";
import {TextField} from "formik-mui";
import Button from "@mui/material/Button";


const partnersGroup = {
  partnerFirstName: "",
  partnerLastName: "",
  partnerEmail: "",
};


const PartnersList = (props) => {
  // console.log("PARTNERS=" + JSON.stringify(props.partners))
  return (
    <>
      <FieldArray name="partners">
        {({ push, remove }) => (
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 2, paddingX: 2 }}
          >
            {props.partners.map((_, index) => (
              <>
                <Grid item xs={12} sm={6}>
                  <Field
                    fullWidth
                    name={`partners.${index}.partnerFirstName`}
                    component={TextField}
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    fullWidth
                    name={`partners.${index}.partnerLastName`}
                    component={TextField}
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Field
                    fullWidth
                    name={`partners.${index}.partnerEmail`}
                    component={TextField}
                    label="Email Address"
                    type="email"
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={3}
                  // p={5}
                  justifyContent="flex-end"
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid container item p="0.5"/>
              </>
            ))}{" "}
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => push(partnersGroup)}
              >
                Add Another Account Partner
              </Button>
            </Grid>
          </Grid>
        )}
      </FieldArray>
    </>
  );
}

export default PartnersList;
