import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const DashboardPage = () => {
  const [Day, setDay] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [skuListData, setSkuListData] = useState([]);
  const [selectDay, setselectDay] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

  const handleApiRequest = (e) => {
    e.preventDefault();

    const apiUrl = "https://iapitest.eva.guru";
    const token = localStorage.getItem("JWT_TOKEN");

    const postData = {
      marketplace: "Amazon.com",
      sellerId: "A3N2GBLFIDRYSH",
      requestStatus: 0,
      day: Day,
      excludeYoYData: true,
    };

    axios
      .post(`${apiUrl}/data/daily-sales-overview`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.Data?.item) {
          setResponseData(response.data.Data.item);
        } else {
          console.log("responseData is not available yet");
        }
      });
  };

  const handleItemRequest = (e, date) => {
    e.preventDefault();
    const apiUrl = "https://iapitest.eva.guru";
    const token = localStorage.getItem("JWT_TOKEN");

    const postData = {
      marketplace: "Amazon.com",
      sellerId: "A3N2GBLFIDRYSH",
      salesDate: date,
      salesDate2: date,
      pageSize: 30,
      pageNumber: 1,
      isDaysCompare: 1,
    };

    axios
      .post(`${apiUrl}/data/daily-sales-sku-list`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.Data &&
          response.data.Data.item &&
          response.data.Data.item.skuList
        ) {
          setSkuListData(response.data.Data.item.skuList);
        } else {
          console.log("skuListData is not available yet");
        }
      });
  };

  const toggleVisibility = () => {
    setselectDay(!selectDay);
  };

  const handleColumnClick = (index) => {
    setActiveColumn(index);
  };

  return (
    <React.Fragment>
      <Header />
      <div
        style={{
          margin: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <h1>Daily Sales</h1>
          <form onSubmit={handleApiRequest}>
            <input
              onClick={(e) => toggleVisibility(true)}
              style={{
                backgroundColor: "white",
                outline: "none",
                border: "none",
                fontSize: "18px",
                position: "relative",
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
              type="button"
              name="select_day"
              id="select_day"
              value={"Last " + Day + " Day"}
            />

            {selectDay === true && (
              <div>
                <div className="dropdown_table">
                  <div className="dropdown_item">
                    <button
                      type="submit"
                      onClick={(e) => {
                        setDay(7);
                        setSelectedDate(responseData[0]?.date);
                      }}
                    >
                      7 Day
                    </button>
                  </div>
                  <div className="dropdown_item">
                    <button
                      type="submit"
                      onClick={(e) => {
                        setDay(14);
                        setSelectedDate(responseData[0]?.date);
                      }}
                    >
                      14 Day
                    </button>
                  </div>
                  <div className="dropdown_item">
                    <button
                      type="submit"
                      onClick={(e) => {
                        setDay(30);
                        setSelectedDate(responseData[0]?.date);
                      }}
                    >
                      30 Day
                    </button>
                  </div>
                  <div className="dropdown_item">
                    <button
                      type="submit"
                      onClick={(e) => {
                        setDay(60);
                        setSelectedDate(responseData[0]?.date);
                      }}
                    >
                      60 Day
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "end",
            }}
          >
            {responseData.map((item, index) => (
              <div style={{ padding: "20px" }} key={index}>
                <div
                  onClick={(e) => {
                    handleItemRequest(e, item.date);
                    handleColumnClick(index);
                  }}
                  style={{
                    height: `${item.fbaAmount / 5}px`,
                    width: "50px",
                    backgroundColor:
                      activeColumn === index ? "green" : "blueviolet",
                  }}
                >
                  <div
                    style={{
                      height: `${item.profit / 16}px`,
                      width: "50px",
                      backgroundColor: "aquamarine",
                    }}
                  ></div>
                  <p
                    style={{
                      transform: "rotate(-90deg)",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "white",
                      marginTop: "300%",
                    }}
                  >
                    {"$" + item.fbaAmount + item.fbmAmount}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      padding: "5px 5px 5px 0px",
                      paddingLeft: "50px",
                      fontWeight: "bold",
                      transform: "rotate(-45deg)",
                      marginLeft: "-80px",
                      marginTop: "45px",
                    }}
                  >
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "40px" }}>
          <h2>Sku List</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  SKU
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  ASIN
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Amount
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Product Name
                </th>
              </tr>
            </thead>
            <tbody>
              {skuListData.map((skuItem, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {skuItem.sku}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {skuItem.asin}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      backgroundColor: "lightcyan",
                      fontWeight: "bold",
                    }}
                  >
                    {skuItem.amount + " $"}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {skuItem.productName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
