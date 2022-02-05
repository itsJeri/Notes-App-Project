class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags, id: false, primary_key: :id do |t|
      t.string :id, primary_key: true
      t.string :name
      t.timestamps
    end
    add_index :tags, :id
  end
end
