import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserRole } from '../../store/slice/usersSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel, TablePagination } from '@mui/material';
import Loading from "../Loading/loading";

const UserList = () => {
    const dispatch = useDispatch();
    const { users = [], status, error, noUsersMessage, totalCount } = useSelector((state) => state.users || {}); // totalCount - общее количество пользователей
    const { role } = useSelector((state) => state.auth.user);  // Получаем роль текущего пользователя
    const [selectedRole, setSelectedRole] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        console.log(role);
        dispatch(fetchUsers({ page: page + 1, limit: rowsPerPage }));
    }, [dispatch, page, rowsPerPage]);

    useEffect(() => {
        const initialRoles = {};
        users.forEach(user => {
            initialRoles[user.id] = user.role;
        });
        setSelectedRole(initialRoles);
    }, [users]);

    const handleRoleChange = (userId, role) => {
        console.log('Updating role:', userId, role);

        setSelectedRole(prevState => {
            const updatedState = { ...prevState, [userId]: role };
            console.log('Updated selectedRole state:', updatedState);
            return updatedState;
        });

        dispatch(updateUserRole({ userId, role })).then(() => {
            dispatch(fetchUsers({ page: page + 1, limit: rowsPerPage }));
        }).catch(error => {
            console.error('Error updating role:', error);
        });
    };

    const handleRoleSelectChange = (userId, event) => {
        const role = event.target.value;
        handleRoleChange(userId, role);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);  // Изменяем страницу
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (status === 'failed') {
        return <div>{error || "Ошибка при загрузке данных"}</div>;
    }

    const filteredUsers = users.filter(user => user.role !== 'владелец');

    if (role !== 'владелец') {
        return (
            <>
            <div className="container__eror">
                <h1>404</h1>
                <h2>Такой страницы не существует</h2>
            </div>
        <Loading/>
            </>
    )
    }

    return (
        <div>
            {noUsersMessage && <div>{noUsersMessage}</div>}
            <TableContainer>
                <Table>
                <TableHead>
                        <TableRow>
                            <TableCell>Имя</TableCell>
                            <TableCell>Почта</TableCell>
                            <TableCell>Роль</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name} {user.surname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>Роль</InputLabel>
                                        <Select
                                            value={selectedRole[user.id] || ''}  // Используем состояние selectedRole
                                            onChange={(event) => handleRoleSelectChange(user.id, event)}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200,  // Устанавливаем максимальную высоту меню
                                                        width: 150,  // Ограничиваем ширину меню
                                                    },
                                                },
                                            }}
                                            sx={{
                                                width: 150,  // Ограничиваем ширину самого селектора
                                            }}
                                        >
                                            <MenuItem value="клиент">Клиент</MenuItem>
                                            <MenuItem value="механик">Механик</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

export default UserList;
