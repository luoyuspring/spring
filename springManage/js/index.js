/**
 * Created by dell on 2018/6/30.
 */

$(function () {

  // 1.绘制左侧柱状图
  var echartsLeft = echarts.init(document.querySelector('.echarts-left'));
  var optionLeft = {
    title : {
      text : '2018年注册人数'
    },
    tooltip : {
      trigger : 'item'
    },
    legend : {
      data : ['人数']
    },
    xAxis : {
      data : ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis : {},
    series : [{
      name : '人数',
      type : 'bar',
      data : [1000, 1500, 1800, 1200, 2500, 1800]
    }]
  };
  echartsLeft.setOption(optionLeft);

  // 2.绘制右侧饼图
  var echartsRight = echarts.init(document.querySelector(".echarts-right"));

  // 指定图表的配置项和数据
  var optionRight = {
    // 大标题
    title : {
      text: '热门品牌销售',
      // 子标题
      subtext: '2018年6月',
      // 控制水平方向居中
      x:'center'
    },
    // 提示框组件
    tooltip : {
      // item 数据项触发, 用于饼图
      trigger: 'item',
      // 指定 提示框 组件的文本的
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // 控制图例的显示方向,  horizontal 水平
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    // 系列名称, 里面放了数据项的集合
    series : [
      {
        name: '品牌',
        type: 'pie',
        // 圆直径的长度
        radius : '70%',
        // 圆心的位置, x, y
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        // 设置是阴影
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echartsRight.setOption(optionRight);


});