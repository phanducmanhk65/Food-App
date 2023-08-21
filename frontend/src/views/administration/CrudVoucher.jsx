import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const VoucherManagement = () => {
    const [vouchers, setVouchers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState({});

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/voucher/allvoucher",
                {
                    withCredentials: true
                });
            setVouchers(response.data);
        } catch (error) {
            console.error("Error fetching vouchers:", error);
        }
    };

    const handleCreateVoucher = async (newVoucher) => {
        try {
            const response = await axios.post("http://localhost:3000/voucher/createvoucher", newVoucher,
                {
                    withCredentials: true
                });
            setVouchers([...vouchers, response.data]);
        } catch (error) {
            console.error("Error creating voucher:", error);
        }
    };

    const handleDeleteVoucher = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/voucher/${id}`,
                {
                    withCredentials: true
                });
            const updatedVouchers = vouchers.filter((voucher) => voucher.id !== id);
            setVouchers(updatedVouchers);
        } catch (error) {
            console.error("Error deleting voucher:", error);
        }
    };

    const handleEditVoucher = (voucher) => {
        setEditing(true);
        setCurrentVoucher(voucher);
    };

    const handleUpdateVoucher = async (id, updatedVoucher) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/voucher/${id}`,
                updatedVoucher,
                {
                    withCredentials: true
                }
            );

            setVouchers((prevVouchers) =>
                prevVouchers.map((voucher) => (voucher.id === id ? response.data : voucher))
            );
            setEditing(false);
        } catch (error) {
            console.error("Error updating voucher:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setCurrentVoucher({});
    };

    return (
        <div className="container mt-4">
            <h1>Voucher Management</h1>
            <div className="d-flex p-3">
                {editing ? (
                    <EditVoucherForm
                        currentVoucher={currentVoucher}
                        onUpdateVoucher={handleUpdateVoucher}
                        onCancelEdit={handleCancelEdit}
                        editing={editing}
                    />
                ) : (
                    <>
                        <AddVoucherForm onCreateVoucher={handleCreateVoucher} />
                        {vouchers && vouchers.length > 0 && (
                            <VoucherList
                                vouchers={vouchers}
                                onDeleteVoucher={handleDeleteVoucher}
                                onEditVoucher={handleEditVoucher}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const AddVoucherForm = ({ onCreateVoucher }) => {
    const [voucher, setVoucher] = useState({
        code: "",
        discount: Number,
        expiredAt: Date,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher({ ...voucher, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateVoucher(voucher);
        setVoucher({
            code: "",
            discountPercent: 10,
            expiryDate: "",
            description: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="code"
                    placeholder="Voucher Code"
                    value={voucher.code}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="discountPercent"
                    placeholder="Discount (%)"
                    onChange={handleChange}
                    value={voucher.discountPercent}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="date"
                    name="expiredAt"
                    value={voucher.expiredAt}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Add Voucher
            </button>
        </form>
    );
};

const EditVoucherForm = ({ currentVoucher, onUpdateVoucher, onCancelEdit, editing }) => {
    const [voucher, setVoucher] = useState(currentVoucher);

    useEffect(() => {
        setVoucher(currentVoucher);
    }, [currentVoucher, editing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher((prevVoucher) => ({
            ...prevVoucher,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateVoucher(currentVoucher.id, voucher);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="code"
                    value={voucher.code}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="discountPercent"
                    placeholder="Discount (%)"
                    onChange={handleChange}
                    value={voucher.discountPercent}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="date"
                    name="expiredAt"
                    value={voucher.expiredAt}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Update Voucher
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                Cancel
            </button>
        </form>
    );
};

const VoucherList = ({ vouchers, onDeleteVoucher, onEditVoucher }) => {
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Discount (%)</th>
                    <th>Created Date</th>
                    <th>Expiry Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {vouchers.map((voucher) => (
                    <tr key={voucher.id}>
                        <td>{voucher.id}</td>
                        <td>{voucher.code}</td>
                        <td>{voucher.discountPercent}</td>
                        <td>{voucher.createdAt}</td>
                        <td>{voucher.expiredAt}</td>
                        <td>
                            <button onClick={() => onEditVoucher(voucher)} className="btn btn-info">
                                Edit
                            </button>
                            <button
                                onClick={() => onDeleteVoucher(voucher.id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VoucherManagement;
