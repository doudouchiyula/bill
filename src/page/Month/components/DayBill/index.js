import { useMemo, useState } from 'react'
import './index.css'
import classNames from 'classnames'
import { billTypeToName } from '@/contants'
import Icon from '@/component/Icon'
const DayBill = ({ date, billList }) => {

  const dayResult = useMemo(() => {
    const pay = billList.filter(item => item.type === 'pay').reduce((prev, cur) => prev + cur.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((prev, cur) => prev + cur.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [billList])

  const [showDetail, setShowDetail] = useState(false)
  const show = () => {
    setShowDetail(!showDetail)
  }
  return (
    <div className="item" onClick={show}>
      <div className='date-header'>
        <span className="date">{date}</span>
        <span className={classNames('arrow', showDetail && 'expand')}></span>
      </div>
      <div className={classNames('accounts', showDetail && 'accounts-border')}>
        <div className="slice">
          <span className="pay">支出</span>
          <span className="num">{dayResult.pay.toFixed(2)}</span>
        </div>
        <div className="slice">
          <span className="income">收入</span>
          <span className="num">{dayResult.income.toFixed(2)}</span>
        </div>
        <div className="slice">
          <span className="total">{dayResult.total.toFixed(2)}</span>
          <span className="num">结余</span>
        </div>
      </div>
      {
        showDetail && billList.map(item => {
          return (
            <div className='detail' key={item.id}>
              <Icon type={item.useFor}/>
              <span className='usefor'>{billTypeToName[item.useFor]}</span>
              <span className='qian'>{item.money.toFixed(2)}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default DayBill