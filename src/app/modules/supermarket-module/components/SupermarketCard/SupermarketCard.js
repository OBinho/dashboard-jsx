import { useState, useRef, useEffect } from 'react';
import { Container } from '@mui/system';
import { Card, Collapse, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Search, Edit, ArrowBackIosNew, ArrowForwardIos, Storefront, DescriptionOutlined } from '@mui/icons-material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    InputBase,
    IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

//Lógica da tabela:
function createData(cod, descricao, tags, regiao, endereco, emails, telefones, editar, acoes) {
    return { cod, descricao, tags, regiao, endereco, emails, telefones, editar, acoes };
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <ArrowForwardIos /> : <ArrowBackIosNew />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


//Opções do botão expansível da barra inferior.
const options = ['5 resultados por página.', '10 resultados por página.', '25 resultados por página.'];



function SupermarketCard(props) {
    const [rows, setRows] = useState([]);
    const [rowsBackup, setRowsBackup] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (e) => setSearchValue(e.target.value);

    //Lógica da paginação
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(-1);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Expansão do card ↓
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //expansão e seleção do botão da barra inferior ↓
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setRowsBackup(
            [
                createData(140, 'Unidade Carlos Fraga RS', 'Varejo', 'Sul', 'R. Carlos Fraga, 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(141, 'Atacado POA-RS', 'Atacado', 'Sul', 'Av. Coronel Claudio, 2863. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(148, 'Unidade Sarandi RS', 'Varejo', 'Sul', 'R. Presidente Faro, 520 Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(153, 'Unidade São Bernardo SP', 'Varejo', 'Sudeste', 'R. Jurubatuba, 550. Centro. São Bernardo do Cam...', 'gerente@rissulcentro.com.br', '(11) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(155, 'Unidade Exemplo', 'Varejo', 'Sudeste', 'R. Lorem Ipsum , 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(158, 'Unidade Exemplo', 'Varejo', 'Sudeste', 'R. Lorem Ipsum , 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(159, 'Unidade Exemplo', 'Varejo', 'Sudeste', 'R. Lorem Ipsum , 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(162, 'Unidade Exemplo', 'Varejo', 'Sudeste', 'R. Lorem Ipsum , 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(167, 'Unidade Exemplo', 'Varejo', 'Sudeste', 'R. Lorem Ipsum , 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
                createData(171, 'Unidade Exemplo', 'Varejo', 'Sudeste', 'R. Lorem Ipsum , 1670. Centro. Porto Alegre', 'gerente@rissulcentro.com.br', '(51) 98907-8514 ...', 'btn Edit', 'Detalhes'),
            ]
        )
    }, [])

    useEffect(() => {
        if (searchValue != '') {
            let newRows = rowsBackup.filter(x => x.descricao.toLowerCase().includes(searchValue.toLowerCase()))
            setRows([...newRows])
        } else if (rowsBackup.length > 0) {
            setRows([...rowsBackup])
        }
    }, [searchValue])

    useEffect(() => {
        if (rowsBackup.length > 0) {
            setRows([...rowsBackup])
        }
    }, [rowsBackup])

    return (
        <Container
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex flex-col flex-auto w-full max-h-full"
            style={styles.containerStyle}
        >
            <Card style={styles.cardStyle}>
                <div style={styles.cardHeaderContainer}>
                    <div style={{ display: 'flex' }}>
                        <img style={styles.supermarketPhoto} src="https://media.glassdoor.com/sqll/2485791/unisuper-squarelogo-1553233507589.png" alt="BigCo Inc. logo" />
                        <div style={styles.headerInfoContainer}>
                            <div style={styles.supermarketTitle}>
                                {props.smTitle}
                            </div>
                            <div style={styles.supermarketInfo}>
                                <span>{props.smShopSum} Lojas</span>
                                <span>Região: {props.smRegions}</span>
                                <span>Tag: {props.smTags}</span>
                                <span>{props.smEmailSum} E-mails</span>
                                <span>{props.smPhoneSum} Telefones</span>
                            </div>

                        </div>
                    </div>
                    <div>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </div>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div>

                        <div style={styles.cardContentContainer}>

                            {/* Container da caixa de pesquisa */}
                            <div>

                                <div style={styles.searchBar}>

                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <Search style={{ color: 'A6A6A6' }} />
                                    </IconButton>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Pesquisar supermercado"
                                        inputProps={{ 'aria-label': 'Pesquisar supermercado' }}
                                        onChange={handleSearchChange}
                                        value={searchValue}
                                    />

                                </div>

                            </div>

                            {/* Container da tabela de lojas */}
                            <div style={{ marginTop: 8, marginBottom: 8, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <TableContainer>
                                    <Table sx={{ width: '100%' }} size="small" aria-label="custom pagination table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell style={{ width: 40 }}>Cod</StyledTableCell>
                                                <StyledTableCell style={{ width: 240 }} align="left">Descrição</StyledTableCell>
                                                <StyledTableCell style={{ width: 90 }} align="left">Tags</StyledTableCell>
                                                <StyledTableCell style={{ width: 90 }} align="left">Região</StyledTableCell>
                                                <StyledTableCell style={{ width: 380 }} align="left">Endereço</StyledTableCell>
                                                <StyledTableCell style={{ width: 260 }} align="left">E-mails</StyledTableCell>
                                                <StyledTableCell style={{ width: 200 }} align="left">Telefones</StyledTableCell>
                                                <StyledTableCell style={{ width: 60 }} align="left">Edit</StyledTableCell>
                                                <StyledTableCell style={{ width: 90 }} align="left">Ações</StyledTableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : rows
                                            ).map((row) => (
                                                <StyledTableRow
                                                    key={row.cod}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.cod}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" style={{ fontWeight: 700 }}><Storefront /> {row.descricao}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.tags}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.regiao}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.endereco}</StyledTableCell>
                                                    <StyledTableCell align="justify">{row.emails} <DescriptionOutlined style={{ color: 'gray' }} /></StyledTableCell>
                                                    <StyledTableCell align="justify">{row.telefones} <DescriptionOutlined style={{ color: 'gray' }} /></StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        <Edit style={{ color: '#434343' }} onClick={() => {console.log('Botão editar pressionado.')}} />
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" style={{ fontWeight: 700, textDecorationLine: 'underline' }} onClick={() => {console.log('Botão DETALHES pressionado.')}}>{row.acoes}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                <StyledTableRow style={{ height: 53 * emptyRows }}>
                                                    <StyledTableCell colSpan={6} />
                                                </StyledTableRow>
                                            )}
                                        </TableBody>

                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, { label: 'Todos', value: -1 }]}
                                                    colSpan={9}
                                                    count={rows.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        labelId: 'Resultados',
                                                        inputProps: {
                                                            'aria-label': 'Resultados por página',
                                                        },
                                                        native: true,
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>

                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </Card>
        </Container >
    );
}

const styles = {
    containerStyle: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    cardStyle: {
        marginTop: 10,
        width: 1500,
        padding: 10,
        borderRadius: 12,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column'
    },
    cardHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    supermarketPhoto: {
        width: 85,
        height: 84,
        borderRadius: '69px'
    },
    headerInfoContainer: {
        marginLeft: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    supermarketTitle: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '38px',
        lineHeight: '42px'
    },
    supermarketInfo: {
        fontFamily: 'Roboto',
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '19px',
        width: '100%',
        display: 'flex',
        gap: 16
    },
    cardContentContainer: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 300,
        borderRadius: '8px',
        boxShadow: 'inset 0px 4px 4px gray',
        color: 'gray',
        paddingLeft: 8,
        marginRight: 14
    }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'black',
        fontFamily: 'Roboto',
        fontWeight: '700'
    },
    [`&.${tableCellClasses.body}`]: {
        fontFamily: 'Roboto',
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#F2F2F2',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default SupermarketCard;