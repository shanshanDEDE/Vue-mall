                                            <template>
                                              <main class="  mx-auto my-auto">

                                                <div class="content-container">
                                                  <div class="profile-card">
                                                    <div class="profile-header">
                                                      <h1 class="brand-title">門市資訊</h1>
                                                    </div>
                                                    <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->

                                                    <div class="container-fluid">
                                                      <div class="row">
                                                        <!-- 左側欄位 -->
                                                        <div class="col-md-6" style="margin-top: 20px;">
                                                          <div class="column position-relative overflow-hidden p-3 p-md-4 m-md-3 text-center">
                                                            <div class="col-md-12  mx-auto my-5" style="margin-top: 20px;">
                                                              <h2>國立成功大學</h2>
                                                              <div style="align-items: center;">
                                                                <h2>Apple Tree</h2>
                                                              </div>
                                                              <h2>校園體驗中心</h2>
                                                              <div>
                                                                Bussiness Time<br>
                                                                營業時間<br>
                                                                週一～週五 11:00~19:00<br>
                                                                週六 11:00~18:00<br>
                                                                週日公休<br>
                                                                寒暑假營業時間<br>
                                                                週一～週五 11:00~18:00<br>
                                                                週六 11:00~17:00<br>
                                                                週日公休<br>
                                                               <br>
                                                                <div class=" text-center"><input style="border-radius: 5px ;border: #5c636a 1px solid" type="text" v-model="searchQuery" placeholder="輸入地址獲得路徑" @keyup.enter="searchLocation"></div>
                                                              <button @click="initMap" style="border-radius: 5px ;border: #5c636a 1px solid">回到本店位置</button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        <!-- 右側欄位 -->
                                                        <div class="col-md-6 d-flex  " style="margin-top: 20px;">
                                                          <div class="column position-relative overflow-hidden p-3 p-md-4 m-md-3 ">
                                                            <div class="search-map-container map-container text-center">

                                                                <div id="map" style="width: 600px; height: 450px; border: 0;"></div>

                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </main>
                                              <div >

                                              </div>
                                            </template>

                                            <script>
                                            export default {
                                              data() {
                                                return {
                                                  searchQuery: '', // 用於綁定輸入欄位的值
                                                  map: null, // Google 地圖實例
                                                  directionsService: null, // Directions Service 實例
                                                  directionsRenderer: null, // Directions Renderer 實例
                                                  marker: null // 地圖標記
                                                };
                                              },
                                              mounted() {
                                                this.initMap(); // 初始化地圖
                                              },
                                              methods: {
                                                initMap() {
                                                  // 初始化地圖，設置初始中心點為國立成功大學的位置
                                                  this.map = new google.maps.Map(document.getElementById("map"), {
                                                    center: { lat: 22.99744744334594, lng: 120.21683887350589 }, // 國立成功大學的經緯度
                                                    zoom: 15 // 調整縮放級別以便更清楚地看到國立成功大學的位置
                                                  });

                                                  // 初始化 Directions Service
                                                  this.directionsService = new google.maps.DirectionsService();

                                                  // 初始化 Directions Renderer，並將其連接到地圖上
                                                  this.directionsRenderer = new google.maps.DirectionsRenderer();
                                                  this.directionsRenderer.setMap(this.map);

                                                  // 在地圖上標記國立成功大學的位置
                                                  new google.maps.Marker({
                                                    position: { lat: 22.99744744334594, lng: 120.21683887350589 }, // 國立成功大學的經緯度
                                                    map: this.map,
                                                    title: '國立成功大學'
                                                  });
                                                },



                                                searchLocation() {
                                                  // 當用戶輸入文字時，搜索地點並更新地圖中心點和標記
                                                  const geocoder = new google.maps.Geocoder();
                                                  geocoder.geocode({ address: this.searchQuery }, (results, status) => {
                                                    if (status === 'OK' && results && results.length > 0) {
                                                      const location = results[0].geometry.location;
                                                      this.map.setCenter(location);
                                                      if (this.marker) {
                                                        this.marker.setMap(null);
                                                      }
                                                      this.marker = new google.maps.Marker({
                                                        position: location,
                                                        map: this.map,
                                                        title: this.searchQuery
                                                      });

                                                      // 調用計算路徑的方法
                                                      this.calculateAndDisplayRoute(location);
                                                    } else {
                                                      console.error('Geocode was not successful for the following reason:', status);
                                                    }
                                                  });
                                                },

                                                calculateAndDisplayRoute(destination) {
                                                  // 設置起點為用戶輸入的位置，終點為國立成功大學的位置
                                                  const request = {
                                                    origin: destination,
                                                    destination: { lat: 22.99744744334594, lng: 120.21683887350589 }, // 國立成功大學的經緯度
                                                    travelMode: 'DRIVING'
                                                  };
                                                  // 使用 Directions Service 計算路徑
                                                  this.directionsService.route(request, (response, status) => {
                                                    if (status === 'OK') {
                                                      // 將路徑顯示在地圖上
                                                      this.directionsRenderer.setDirections(response);
                                                    } else {
                                                      console.error('Directions request failed due to ' + status);
                                                    }
                                                  });
                                                }

                                              }
                                            };
                                            </script>

                                            <style scoped>

                                            .search-map-container {
                                              display: flex;
                                              flex-direction: column;
                                              align-items: center;
                                            }

                                            .profile-card {
                                              width: 100%;
                                              max-width: 1000px;
                                              margin: 0 auto; /* 設定最大寬度 */
                                              padding: 20px;
                                              border-radius: 6px;
                                              background-color: #fff;
                                              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                            }

                                            .profile-header {
                                              text-align: center;
                                              margin-bottom: 30px;
                                            }

                                            .brand-title {
                                              font-size: 2.5em;
                                              color: #333;
                                            }

                                            .horizontal-divider {
                                              width: 100%;
                                              height: 1px;
                                              background-color: #ccc; /* 淡灰色背景色 */
                                              margin-bottom: 20px; /* 根據需要增加下邊距 */
                                            }

                                            /* 欄位美化樣式 */
                                            .column {
                                              background-color: #f9f9f9;
                                              border-radius: 20px; /* 圓弧半徑 */
                                              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                                            }

                                            /* 標題美化樣式 */
                                            h2 {
                                              font-size: 24px;
                                              color: #333;
                                              margin-bottom: 10px;
                                            }

                                            div {
                                              margin-bottom: 10px; /* 較小的底部邊距 */
                                            }



                                            </style>
