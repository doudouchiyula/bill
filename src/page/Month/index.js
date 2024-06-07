import { NavBar, DatePicker } from "antd-mobile"
import './index.scss'
import { useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import _ from 'lodash'
import DayBill from '@/page/Month/components/DayBill'

const Month = () => {
  //按月做数据的分组
  const billList = useSelector(state => state.bill.billList)
  const monthGoup = useMemo(() => {
    //return出去的为计算好的值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY | MM'))
  }, [billList])
  // console.log(monthGoup);

  const [curMonthList, setCurMonthList] = useState([])

  const [dateVisible, setDateVisible] = useState(false)
  const [curDate, setCurDate] = useState(() => dayjs(new Date()).format('YYYY | MM'))

  //点击确定的时候触发
  const onConfirm = (date) => {
    setDateVisible(false)
    console.log("当前选择的日期是：" + date);
    const formatDate = dayjs(date).format('YYYY | MM')
    setCurDate(formatDate)
    if (monthGoup[formatDate]) {
      setCurMonthList(monthGoup[formatDate])
    }

  }

  const monthResult = useMemo(() => {
    const pay = curMonthList.filter(item => item.type === 'pay').reduce((prev, cur) => prev + cur.money, 0)
    const income = curMonthList.filter(item => item.type === 'income').reduce((prev, cur) => prev + cur.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [curMonthList])

  //当前月按照月日分组
  const dayGroup = useMemo(() => {
    const groupDate = _.groupBy(curMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupDate)
    console.log('当前月分组：' + keys);
    return {
      groupDate,
      keys
    }
  }, [curMonthList])


  //一打开页面即要计算当前月对应的收支
  useEffect(() => {
    //边界值控制
    if (monthGoup[curDate]) {
      setCurMonthList(monthGoup[curDate])
    }
  }, [monthGoup])


  return (
    <div className="month">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span>{curDate + ''}月账单</span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="detail">
            <div className="detail-item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="detail-item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="detail-item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()} />

        </div>
        {/* 每日收支item */}
        {dayGroup.keys.map(key => {
          return <DayBill date={key} billList={dayGroup.groupDate[key]} key={key} />
        })}
      </div>
    </div>
  )
}
export default Month