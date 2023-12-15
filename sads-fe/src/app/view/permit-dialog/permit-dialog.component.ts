import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Preorder } from 'src/app/models/preorder';
import { ApiService } from 'src/app/services/api/api.service';



export enum PermitStatus {
  // status: 'Pending' | 'Requesting' | 'Accepted' | 'Rejected';
  PENDING = 'pending',
  REQUESTING = 'requesting',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

@Component({
  selector: 'app-permit-dialog',
  templateUrl: './permit-dialog.component.html',
  styleUrls: ['./permit-dialog.component.css'],
})
export class PermitDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Preorder,
    private dialogRef: MatDialogRef<PermitDialogComponent>,
    private api: ApiService,

  ) { }

  async changePermitStatus(status: string) {
    console.log(this.data.permit_status);
    console.log('change status >>', status);

    const body = {
      preorder_id: this.data.id,
      permit_status: status
    }

    const isStatusChanged = await this.api.changePermitStatus(body);

    if (isStatusChanged) {
      this.dialogRef.close();
    }
  }
}
