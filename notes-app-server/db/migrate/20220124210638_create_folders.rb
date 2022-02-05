
class CreateFolders < ActiveRecord::Migration[6.1]
  def change
    create_table :folders, id: false, primary_key: :id do |t|
      t.string :id, primary_key: true
      t.string :name
      t.timestamps
    end
    add_index :folders, :id
  end
end
