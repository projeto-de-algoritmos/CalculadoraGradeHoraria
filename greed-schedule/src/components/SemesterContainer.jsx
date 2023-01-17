import "./SemesterContainer.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SemesterContainer = ({ schedule }) => {
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
  const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

  return (
    schedule && (
      <div className="classes">
        <h3>Matérias selecionadas</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Horário/dias</TableCell>
                <TableCell align="center">Segunda</TableCell>
                <TableCell align="center">Terça</TableCell>
                <TableCell align="center">Quarta</TableCell>
                <TableCell align="center">Quinta</TableCell>
                <TableCell align="center">Sexta</TableCell>
                <TableCell align="center">Sábado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hours.map((hour, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{hour}</TableCell>
                  {days.map((day, index) => (
                    <TableCell key={index} align="center">
                      {schedule[day][hour]?.["nome"] || "--"}-
                      {` ${schedule[day][hour]?.["professor"] || ""}`}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default SemesterContainer;
