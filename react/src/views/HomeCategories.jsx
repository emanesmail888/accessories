import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
export default function HomeCategories() {
    const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
      getCategories();
    }, [])


    const getCategories = () => {
    //   setLoading(true)
      axiosClient.get('/home')
        .then(({ data }) => {
            console.log(data[1]);

        //   setLoading(false)
          setCategories(data[1])
        })
        .catch(() => {
        //   setLoading(false)
        })
    }

    return (
        <div>

       {/* {loading &&
            <table>

              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
              </table>

            } */}



                <div className="center_3_top_2 clearfix">
                {categories.map(c => (

                    <div key={c.id} className="col-sm-3 center_3_top_2_left clearfix">
                    <div className="center_3_top_2_left_inner clearfix">
                    <p><a href={'/category_products/' + c.id}><img src={'../../images/' + c.image} width="100%" style={{height:"200px"}}/></a></p>
                    </div>
                    </div>



              ))};
              </div>



            </div>

            );
}

