import { CartModel } from "../Entities/DatabaseModels/CartFactory";
import { DB } from "../Database/dbConfig";
require("dotenv").config();

export class CartService {
  constructor(private db: DB) {
    this.getCardByUserId = this.getCardByUserId.bind(this);
  }
  public async getCardByUserId(userId: number): Promise<CartModel> {
    return await this.db.Cart.findOne({ where: { userId } });
  }
}
