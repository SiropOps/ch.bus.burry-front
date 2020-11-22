import { Component, OnInit } from '@angular/core';
import { SystemService } from '../service/system.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  constructor(private systemService: SystemService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  public onShutdown() {
    this.systemService.shutdown().subscribe(() => {
      this.toastr.warning('Le système va s\'éteindre', '', {
        timeOut: 3000
      });
    });

  }

  public onReboot() {
    this.systemService.reboot().subscribe(() => {
      this.toastr.warning('Le système va redémarrer', '', {
        timeOut: 3000
      });
    });

  }

  public onUpload() {
    this.systemService.dump().subscribe(
      () => {
        this.toastr.info('Le système est sauvagardé, merci de l\'éteindre', '', {
          timeOut: 3000
        });
      }
    );

  }



}
