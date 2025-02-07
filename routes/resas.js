import Padel from '../services/padel.js';
import express from 'express';
import { format } from 'date-fns';
import resa from '../services/resa.js';
const dateSearchCount = 40;
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {

  const ctx = JSON.stringify(req.body);
  console.log('ctx:' + req.body)
  var res = await getAllResCtx(req.body.ctx);
  // res.send(res);
  resa.sendMessage();
});

export default router;

function formatDate(date) {
  const dt = new Date(date);
  return `${dt.toLocaleDateString('fr', { weekday: 'long' })} ${dt.toLocaleString('fr', { dateStyle: 'short' })}`

}

async function getResaCtx(sdate, ctx) {
  await Padel.getResas(sdate, ctx.startTime, ctx.endTime).then(res => {
    if (isCoursBookable(res.data)) {
      ctx.result[sdate] = getBookableSlots(res.data);
      ctx.bookableDates.push(sdate);
      const dtFmt= formatDate(sdate);
      ctx.result[sdate].forEach((slot) => {
        ctx.freeSlots.push(`${dtFmt} - ${slot.startAt} - ${slot.duration / 60}mn`);
      });
    }
  }).catch(err => {
    console.log(err);
  });
}
async function getAllResCtx(ctx) {
  ctx.previousSlots = ctx.freeSlots ? [...ctx.freeSlots] : [];
  ctx.freeSlots = [];
  ctx.bookableDates = [];
  ctx.result = {};
  const dates = generateDatesFromCtx(ctx);

  // removeSearch(ctx.name);
  const promises = [];
  dates.forEach((d) => promises.push(getResaCtx(d, ctx)));
  const newSlots = [];
  await Promise.all(promises).finally(() => {
    // const newSlots = [];

    ctx.freeSlots.forEach((slot) => {
      if (!ctx.previousSlots.includes(slot)) {
        newSlots.push(slot);
      }
    })
    // if (newSlots.length) {
    //   const msg = `terrains libres \n${newSlots.join('\n')}`;
    //   notifyMsg(msg);
    // }
  });
  return newSlots;
  // setTimeout(() => getAllResCtx(ctx), (1000 * 60) * refreshTime.value);
}

function generateDatesFromCtx(ctx) {
  const dtArray = [];
  let sDate = ctx.startDate ? ctx.startDate : new Date();
  if (ctx.days.includes(sDate.getDay()))
    dtArray.push(format(sDate, 'yyyy-MM-dd'))
  for (let i = 0; i < dateSearchCount; i++) {
    sDate.setDate(sDate.getDate() + 1);
    if (ctx.days.includes(sDate.getDay()))
      dtArray.push(format(sDate, 'yyyy-MM-dd'))
  }
  return dtArray;
}


function isCoursBookable(cours) {
  if (!cours)
    return false;
  let bookable = false;
  cours.forEach((cr) => {
    if (isBookable(cr.activities[0].slots)) {
      bookable = true;
      return;
    }
  });
  return bookable;
}

function isBookable(slots) {
  if (!slots)
    return false;
  let bookable = false;
  slots.forEach((s) => {
    if (s.prices) {
      s.prices.forEach((price) => {
        if (price.bookable) {
          bookable = true;
          return;
        }
      });
    }
  });

  return bookable;
}

function getBookableSlots(data) {
  const freeSlots = [];

  for (var cours of data) {
    if (!isBookable(cours.activities[0].slots))
      continue;
    for (var slot of cours.activities[0].slots) {
      for (var price of slot.prices) {
        if (!price.bookable)
          continue;
        price.cours = cours.name;
        price.startAt = slot.startAt;
        freeSlots.push(price);
      }
    }
  }
  freeSlots.sort((s1, s2) => s1.startAt.localeCompare(s2.startAt));
  return freeSlots;
}


