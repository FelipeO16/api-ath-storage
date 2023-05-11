import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator, DestroyValidator } from 'App/Validators/Order'
import { Order } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export default class ProductController {
  public async store({ request }: HttpContextContract) {
    const { title, name, obs, products, email } = await request.validate(StoreValidator)
    const sentFrom = new Sender("felipe@athstocktake.com", "Felipe");
    const mailerSend = new MailerSend({
      apiKey: 'mlsn.b5c0d3fa7855ed1cd1bbd8e74a037330e397c01194026ee722d5822ea6e1a088',
    });
    const recipients = [new Recipient(email, "Your Client")];
    const personalization = [
      {
        email: email,
        data: {
          title: title,
          products: products,
          account_name: name,
          support_email: obs
        },
      }
    ];
    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Subject")
    .setTemplateId('z3m5jgr96vmgdpyo')
    .setPersonalization(personalization);
    try {
      await mailerSend.email.send(emailParams);
      return { message: 'Email enviado com sucesso.' }
    } catch (error) {
      console.log(error)
    }
  }

  // create a log
  public async log({ request }: HttpContextContract) {
    const payload = request.all()
    console.log(payload)
    await Database.insertQuery().table('logs').insert({ payload: JSON.stringify(payload) })
    return { message: 'Log criado com sucesso.' }
  }

  public async index({ auth }: HttpContextContract) {
    try {
      const orders = await Database.query()
        .from('orders')
        .select('*')
        .where('user_id', auth.user!.id)
        .where('status', true)
      for (let order in orders) {
        orders[order].total = 0
        const products = await Database.query()
          .from('order_products')
          .sum('price as total')
          .where('order_id', orders[order].id)
        orders[order].total = products[0].total
      }

      // orders.map(async (order) => {
      //   order.total = 0
      //   const products = await Database.query()
      //     .from('order_products')
      //     .sum('price as total')
      //     .where('order_id', order.id)
      //   if (products[0].total !== null) {
      //     order.total = order.total + products[0].total
      //     console.log(order)
      //   }
      // })
      return orders
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ response}: HttpContextContract) {
    const logs = await Database.query().from('logs')
    const decodedLogs = logs.map((log) => {
      return JSON.parse(log.payload)
    })
    return response.ok({ message: 'Logs retornados com sucesso.', data: decodedLogs })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const { id, name, place, obs, status } = await request.validate(UpdateValidator)
    await Database.transaction(async (trx) => {
      const order = await Order.findByOrFail('id', id)
      order.useTransaction(trx)
      await order.load('user')
      await bouncer.authorize('isAuthorized', order.userId)
      order.merge({ name, place, obs, status })
      await order.save()
      return response.ok({ message: 'Comanda alterada com sucesso.' })
    })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const { id } = await request.validate(DestroyValidator)
    const order = await Order.findByOrFail('id', id)
    await order.load('user')
    await bouncer.authorize('isAuthorized', order.userId)
    order.status = false
    await order.save()
    return response.ok({ message: 'Comanda finalizada com sucesso.' })
  }
  

}
