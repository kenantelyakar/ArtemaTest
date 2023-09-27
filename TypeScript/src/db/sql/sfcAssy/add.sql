/*
    Inserts a new User record.
*/
INSERT INTO Z_SFC_ASSY(
               sfc_bo,
               shop_order_bo,
               resource_bo,
               operation_bo,
               component_bo,
               qty,
               bom_component_bo,
               insuser,
               insdate
               )
VALUES($1,$2,$3,$4,$5,$6,$7,$8,to_timestamp($9))
RETURNING *