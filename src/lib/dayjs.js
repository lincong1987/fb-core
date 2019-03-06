/*
 This file 'dayjs' is part of Firebird Integrated Solution 1.0

 Copyright (c) 2019 Lincong

 Contact:  
        Email: lincong1987@gmail.com

        QQ: 159257119
 
 See Usage at http://www.jplatformx.com/firebird

 Create date: 2019-01-15 16:22
 */


import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat'; // 按需加载
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
// import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(advancedFormat);// 使用插件

dayjs.extend(AdvancedFormat);

dayjs.extend(relativeTime);

dayjs.extend(isLeapYear);

dayjs.extend(weekOfYear);

dayjs.extend(isSameOrAfter);

dayjs.extend(isSameOrBefore);

dayjs.extend(isBetween);

// dayjs.extend(quarterOfYear)


export {dayjs};