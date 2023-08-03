import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  actFetchDishRequest,
  AddCart,
  actSearchDishRequest,
} from "../../store/action/index";

const Main = ({
  _dish,
  actFetchDishRequest,
  AddCart,
  actSearchDishRequest,
}) => {
  useEffect(() => {
    actFetchDishRequest();
  }, [actFetchDishRequest]);

  console.log(_dish);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Xử lý sự kiện khi người dùng thay đổi giá trị ô input tìm kiếm
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      console.log("Từ khóa tìm kiếm: ", searchTerm);
      const filteredDishes = _dish.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(filteredDishes);
    } else {
      actFetchDishRequest();
      setSearchResult([]);
    }
  };

  const handleAddToCart = (item) => {
    AddCart(item);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Nhập từ khóa tìm kiếm..."
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-md-12">
          <div className="row">
            {searchResult.length > 0
              ? searchResult.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-2"
                    style={{ marginBottom: "10px" }}>
                    <img
                      src={item.imageUrl}
                      className="img-responsive"
                      style={{ width: "100%", height: "100px" }}
                      alt="dish"
                    />
                    <h5>{item.name}</h5>
                    <span
                      className="badge badge-danger"
                      style={{ cursor: "pointer", color: "black" }}
                      onClick={() => handleAddToCart(item)}>
                      Thêm vào giỏ hàng
                    </span>
                  </div>
                ))
              : _dish.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-2"
                    style={{ marginBottom: "10px" }}>
                    <img
                      src={item.imageUrl}
                      className="img-responsive"
                      style={{ width: "100%", height: "100px" }}
                      alt="dish"
                    />
                    <h5>{item.name}</h5>
                    <span
                      className="badge badge-danger"
                      style={{ cursor: "pointer", color: "black" }}
                      onClick={() => handleAddToCart(item)}>
                      Thêm vào giỏ hàng
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    _dish: state._todoDish._dish,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actFetchDishRequest: () => dispatch(actFetchDishRequest()),
    AddCart: (item) => dispatch(AddCart(item)),
    actSearchDishRequest: (searchTerm) =>
      dispatch(actSearchDishRequest(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
