"use client";
import * as React from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import TicketId from "./ticketId/page";
import TableStatusColumn from "@/components/tableStatus/page";
import TimeDateFormate from "@/components/TicketColumn/TimeDateFormate";
import useAxiosSecure from "@/app/Hooks/useAxiousSecure";
import TicketBackdrop from "@/components/Skeletons/TicketBackdrop";
import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TicketDate from "@/components/TicketDate/TicketDate";
import TicketSkeleton from "@/components/Skeletons/ticketSkeleton";

export default function DataTable() {
  const [axiosSecure] = useAxiosSecure();
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(null);
  const rows = ticketData.ticket;
  const dateTime = ticketData.dateFilter;
  const startDate = dateTime?.start_date.split(" ")[0];
  const endDate = dateTime?.end_date.split(" ")[0];

  useEffect(() => {
    setLoading(true);
    if(selectedDates){
      axiosSecure(`/ticket?start_date=${selectedDates.from}&end_date=${selectedDates.to}`)
      .then((res) => {
        setLoading(false);
        setTicketData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    }else{
      axiosSecure("/ticket")
      .then((res) => {
        setLoading(false);
        setTicketData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    }
   
  }, [selectedDates, axiosSecure]);

  const columns = [
    {
      field: "id",
      headerName: "Ticket ID",
      minWidth: 90,
      align: "left",
      renderCell: (params) => <TicketId {...{ params }} />,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 110,
      renderCell: (params) => <TableStatusColumn {...{ params }} />,
    },
    { field: "company_short_name", headerName: "Company", minWidth: 90 },
    { field: "name", headerName: "Customer Name", minWidth: 175 },
    {
      field: "company_zone_name",
      headerName: "Area",
      minWidth: 150,
    },
    {
      field: "supply_and_distribution_name",
      headerName: "Office",
      minWidth: 150,
    },
    {
      field: "request_category_name",
      headerName: "Ticket Category",
      minWidth: 140,
    },
    {
      field: "created_at",
      headerName: "Ticket Create Time",
      editable: true,
      align: "left",
      headerAlign: "left",
      minWidth: 150,
      renderCell: (params) => <TimeDateFormate {...{ params }} />,
      // type: "dateTime"
    },
  ];

  return (
    <Paper sx={{ height: 780 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ pl: 3, pt: 3, pr: 3 }}
      >
        <Typography variant="h6" sx={{ color: "success.main" }}>
          {" "}
          Ticket List
        </Typography>
        <TicketDate onDatesSelected={setSelectedDates} startDate={startDate} endDate={endDate}/>
      </Stack>
      {loading ? (
        <>
          <TicketSkeleton />
        </>
      ) : (
        <>
          <Box sx={{ height: 710, width: "100%", overflow: "auto", p: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              disableRowSelectionOnClick
              pageSizeOptions={[10, 20]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              checkboxSelection
            />
          </Box>
        </>
      )}
    </Paper>
  );
}
