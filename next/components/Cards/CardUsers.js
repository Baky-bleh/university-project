import {useState} from "react";
import { removeUser, updateUser} from "../../util/APIUtils";
import {useRouter} from "next/navigation";
import {alertService} from "../Alert.service";
// components

export default function CardUsers({cardUserProp, roleProp}) {
  const [users,setUsers] = useState(cardUserProp)
  const [editUser,setEditUser] = useState({ list: []})
  const [word,setWord] = useState("")
  const [ascending,setAscending] = useState(false)
  const [clicked,setClicked] = useState("created_at")
  const [pageCount,setPageCount] = useState(Math.ceil(cardUserProp.length/10))
  const [page,setPage] = useState(0)

  const getPages = (start,end) => {
    let content = [];
    if( start < 0 ) start = 0;
    if( end > pageCount - 1 ) end = pageCount - 1;
    for (let i = start; i <= end; i++) {
      content.push(
        <li key={i}>
          <a onClick={ (event) => {
            event.preventDefault();
            setPage(i);
          }  }
             className={"first:ml-0 active:bg-slate-700 active:text-white hover:bg-slate-500 hover:text-white select-none text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500" + (page === i ? " text-white bg-slate-500 " : " text-slate-500 bg-white")}>
            { i + 1 }
          </a>
        </li>
      );
    }
    return content;
  };

  const sortColumn = (event) => {
    try {
      const userSort = users;
      if (ascending) userSort.sort((x, y) => x[event.target.value].localeCompare(y[event.target.value]));
      else userSort.sort((x, y) => y[event.target.value].localeCompare(x[event.target.value]));
      setAscending(!ascending)
      setClicked(event.target.value)
      setUsers(userSort)
    }
    catch (e) {
      alertService.warn('Түр хүлээгээд дахин оролдоно уу', {
        autoClose: true,
        keepAfterRouteChange: false
      })
      console.log(e);
    }
  }

  let handleInputChange = (event,id) => {
    const target = event.target
    const inputName = target.name
    const inputValue = target.value
    const newUsers = users.map(user => {
      if ( user.id === id ) {
        return {
          ...user,
          [inputName]: inputValue,
        };
      }
      else{
        return user;
      }
    });
    setUsers(newUsers)
  }

  let handleIsActive = (event,id) => {
    const target = event.target
    const inputValue = target.value
    const newUsers = users.map(user => {
      if ( user.id === id ) {
        let active = inputValue === "true";
        return {
          ...user,
          isActive : active,
        };
      }
      else{
        return user;
      }
    });
    setUsers(newUsers)
  }

  const router = useRouter()
  const handleButton = (event,id) => {
    event.preventDefault();
    removeUser(id)
        .then(response => {
          window.location.reload();
        }).catch(error => {
          if( error.statusCode === 401 ){
            localStorage.clear();
            router.push('/auth/login');
          }
          alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
            autoClose: true,
            keepAfterRouteChange: false
          })
        });
  }

  const handleEdit = (event,id ) => {
    event.preventDefault();
    let temp = editUser.list;
    temp.push(id);
    setEditUser({ list: temp });
  }

  const handleCancel = (event,id) => {
    event.preventDefault();
    let temp = editUser.list;
    temp.splice(temp.indexOf(id),1);
    setEditUser({ list: temp });
  }

  const filter = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const results = cardUserProp.filter((user) => {
        return user.username.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setUsers(results);
      setPageCount(Math.ceil(results.length/10))
    } else {
      setUsers(cardUserProp);
      setPageCount(Math.ceil(cardUserProp.length/10))
    }
    setWord(keyword);
  };

  const handleSave = (event,id) => {
    event.preventDefault();
    let temp2 = editUser.list;
    temp2.splice(temp2.indexOf(id),1);
    users.map( user => {
      if( user.id === id  ){
        console.log(user)
        updateUser(user)
            .then(response => {
              window.location.reload();
            }).catch(error => {
          if( error.statusCode === 401 ){
            localStorage.clear();
            router.push('/auth/login');
          }
          alertService.error((error && error.message) || 'Oops! Something went wrong. Please try again!', {
            autoClose: true,
            keepAfterRouteChange: false
          })
        });
        return user;
      }
    })
    setEditUser({ list: temp2 });
  }

  return (
    <div className="not-prose relative rounded-xl overflow-hidden bg-slate-700 animate-fade-in-right">
      <div className="items-center relative flex flex-col break-words mb-6 shadow-lg rounded">
        <div className="overflow-x-auto scrollbar w-full">
          <div className="table border-collapse table-auto w-full touch-pan-x text-sm">
            <div className="table-header-group">
              <div className="table-row">
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  №
                </div>
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  <input
                      type="text"
                      value={word}
                      onChange={filter}
                      className="border-0 placeholder-slate-300 text-white bg-slate-600 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                      placeholder="Хэрэглэгч хайх"
                  />
                </div>
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  Эрх
                </div>
                { roleProp === "admin" ?
                    <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                      Компаний Id
                    </div>
                    :
                    <></>
                }
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  Идэвхтэй эсэх
                </div>
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  <button value="created_at" onClick={sortColumn}>
                    Үүсгэсэн огноо { clicked === "created_at" ? ascending ? <i className="fas fa-angle-up text-green-500"/>  : <i className="fas fa-angle-down text-red-500"/>  : ""}
                  </button>
                </div>
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  Засах
                </div>
                <div className="table-cell font-medium p-4 pl-8 pt-3 pb-3 text-white text-center">
                  Устгах
                </div>
              </div>
            </div>
            <div className="table-row-group bg-slate-600">
            { users ?
              users.slice(page * 10, page * 10 + 10)
                  .map((listValue,index) => {
                    return (<form className="table-row" key={listValue.id}>
                      { editUser.list.includes(listValue.id) ?
                        <>
                          <div className="table-cell  p-4 pl-8 text-slate-200 text-center">{page * 10 + index + 1}</div>
                          <div className="table-cell  pl-4 text-slate-200 text-center">
                            <input
                                type="text" name="username"
                                className="bg-slate-700 rounded-lg text-white px-2 py-1 placeholder-slate-300 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={listValue.username} placeholder="user name" onChange={event => handleInputChange(event,listValue.id)} required
                            />
                          </div>
                          <div className="table-cell  pl-4 text-slate-200 text-center text-slate-600">
                            <select className="bg-slate-700 px-1 py-1 rounded-lg text-white" name="role" value={listValue.role} onChange={event => handleInputChange(event,listValue.id)}>
                              <option value="enterpriseAdmin">компаний админ</option>
                              <option value="user">хэрэглэгч</option>
                            </select>
                          </div>
                          { roleProp === "admin" ?
                              <div className="table-cell  p-4 pl-8 text-slate-200 text-center">
                                <input
                                    type="text" name="enterpriseId"
                                    className="bg-slate-700 rounded-lg text-white px-2 py-1 placeholder-slate-300 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={listValue.enterpriseId} placeholder="enterprise id"
                                    onChange={event => handleInputChange(event, listValue.id)} required
                                />
                              </div>
                              :
                              <></>
                          }
                          <div className="table-cell pl-4 text-slate-200 text-center text-slate-600">
                            <select className="bg-slate-700 py-1 rounded-lg text-white" name="isActive" value={listValue.isActive} onChange={event => handleIsActive(event,listValue.id)}>
                              <option value="true">Тийм</option>
                              <option value="false">Үгүй</option>
                            </select>
                          </div>
                          <div className="table-cell p-4 pl-8 text-slate-200 text-center">{listValue.created_at}</div>
                          <div className="table-cell p-4 pl-8 text-slate-200 text-center">
                            <button className="bg-slate-900 text-white active:bg-slate-600 text-sm font-bold px-2 py-1 uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    onClick={event => { handleSave( event, listValue.id ) }} >
                              Хадгалах
                            </button>
                            </div>
                          <div className="table-cell p-4 pl-8 text-slate-200 text-center">
                            <button className="bg-slate-900 text-white active:bg-slate-600 text-sm font-bold px-2 py-1 uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    onClick={event => {handleCancel(event, listValue.id )}} >
                              Болих
                            </button>
                          </div>
                        </>
                          :
                        <>
                          <div className="table-cell border-slate-700 p-4 pl-8 text-slate-200 text-center">{page * 10 + index + 1}</div>
                          <div className="table-cell font-bold  p-4 pl-8 text-slate-200 text-center">{listValue.username}</div>
                          <div className="table-cell p-4 pl-8 text-slate-200 text-center">{listValue.role}</div>
                          { roleProp === "admin" ?
                              <div
                                  className="table-cell p-4 pl-8 text-slate-200 text-center">{listValue.enterpriseId}</div> : <></>
                          }
                          <div className="table-cell p-4 pl-8 text-slate-200 text-center">{listValue.isActive ? "Тийм" : "Үгүй"}</div>
                          <div className="table-cell p-4 pl-8 text-slate-200 text-center">{new Date(listValue.created_at).toLocaleString("mn-MN",{hour12: false})}</div>
                          { listValue.role === "enterpriseAdmin" && roleProp !== "admin" ?
                              <>
                                <div className="table-cell p-4 pl-8 text-slate-200 text-center">---</div>
                                <div className="table-cell p-4 pl-8 text-slate-200 text-center">---</div>
                              </>
                              :
                              <>
                                <div className="table-cell p-4 pl-8 text-slate-200 text-center">
                                  <button className="bg-slate-900 text-white active:bg-slate-600 text-sm px-2 py-1 font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                          onClick={(event) => { handleEdit( event, listValue.id ) }} >
                                    Засах
                                  </button>
                                </div>
                                <div className="table-cell p-4 pl-8 text-slate-200 text-center">
                                  <button className="bg-slate-900 text-white active:bg-slate-600 text-sm px-2 py-1 font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                          onClick={(event) => {handleButton(event,{ id : listValue.id })}} >
                                    Устгах
                                  </button>
                                </div>
                              </>
                              }
                        </>
                      }
                    </form>);
                  })
                : console.log(users)
            }
            </div>
          </div>
        </div>
        <nav className="block mt-2 mb-2">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <li>
              <a onClick={ (event) => {
                event.preventDefault();
                setPage(0);
              } } className="first:ml-0 active:bg-slate-700 active:text-white hover:bg-slate-500 hover:text-white text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-700">
                <i className="fas fa-chevron-left -ml-px"/>
                <i className="fas fa-chevron-left -ml-px"/>
              </a>
            </li>
            <li>
              <a onClick={ (event) => {
                event.preventDefault();
                page > 0 ? setPage(page-1) :  setPage(0);
              }} className="first:ml-0 active:bg-slate-700 active:text-white hover:bg-slate-500 hover:text-white text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-700">
                <i className="fas fa-chevron-left -ml-px"/>
              </a>
            </li>
            { pageCount > 4 ?
                <> { getPages( page - 1, page + 1 ) } { page < pageCount - 3 ? <li className="select-none ml-1 text-white mr-2 p-0 items-center justify-center">...</li> : <></> } { page < pageCount - 2 ? getPages( pageCount - 1, pageCount - 1 ) : <></> } </>
                :
                <>
                  { pageCount === 0 ? setPageCount(1) : <></> }
                  { getPages(0, pageCount) }
                </> }
            <li>
              <a onClick={ (event) => {
                event.preventDefault();
                page < pageCount - 1 ? setPage(page+1 ) :  setPage(pageCount - 1 );
              }} className="first:ml-0 active:bg-slate-700 active:text-white hover:bg-slate-500 hover:text-white text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-700">
                <i className="fas fa-chevron-right -mr-px"/>
              </a>
            </li>
            <li>
              <a onClick={ (event) => {
                event.preventDefault();
                setPage(pageCount-1);
              }} className="first:ml-0 active:bg-slate-700 active:text-white hover:bg-slate-500 hover:text-white text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-700">
                <i className="fas fa-chevron-right -mr-px"/>
                <i className="fas fa-chevron-right -mr-px"/>
              </a>
            </li>
            <li>
              <input type="number" value={page+1} onChange={event => { event.preventDefault(); setPage(Number(event.target.value)-1);}}
                     className="active:bg-slate-700 active:text-white hover:bg-slate-500 rounded-lg hover:text-white text-sm font-semibold flex w-8 h-8 mx-1 p-1 items-center justify-center relative border border-solid border-slate-500 bg-white text-slate-700"/>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
