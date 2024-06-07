import Icon from "@/component/Icon"
import { NavBar } from "antd-mobile"
import './index.scss'
import '../../normalize.css'
import classNames from "classnames"

const New = () => {
  return (
    <div className="page">
      <div className="header">
        <NavBar className="bar">
          记一笔
        </NavBar>
        <div className="tablist">
          <span className='active'>支出</span>
          <span className="blank"></span>
          <span className="tab_normal">收入</span>
        </div>
        <div className="input">

          <input className="money">
          </input>
        </div>
      </div>

      {/* 列表 */}
      <div className="item">
        <h4 className="title">餐饮</h4>
        <div>
          <Icon type={'food'}></Icon>
          <span className="type">餐费</span>
        </div>
      </div>
    </div>
  )
}
export default New